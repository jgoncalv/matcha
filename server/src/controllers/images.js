const consola = require('consola');
const knex = require('../database');
const fs = require('fs');
const {baseUrl, port} = require('../../config');

const imagesTypes = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
}

function constructImageUrl(imagePath) {
  return `${baseUrl}${port}/${imagePath}`;
}
exports.constructImageUrl = constructImageUrl;

exports.uploadImage = async (req, res) => {
  const {username} = req.params;
  let pathname = req.file.path;
  try {
    if (imagesTypes[req.file.mimetype]) {
      const end = imagesTypes[req.file.mimetype];
      pathname = `public/uploads/${username}_${req.file.filename}.${end}`;
      fs.rename(req.file.path, pathname);

      const image = await knex.transaction(async function (trx) {
        const nb = await trx('users_images')
          .where({ username })
          .count();

        if (nb === 5) throw new Error('Already have the max amount of images');

        const [resultInsert] = await trx('users_images')
          .insert({
            username,
            image_path: pathname,
          })
          .returning(['id', 'image_path'])

        const [{avatar_id}] = await trx('users')
          .select('avatar_id')
          .where({username});

        if (!avatar_id) {
          await trx('users')
            .where({username})
            .update({avatar_id: resultInsert.id});
        }
        return {
          ...resultInsert,
          image_path: constructImageUrl(pathname),
        }
      })

      res.json({image});
    } else {
      throw new Error('Bad image format');
    }
  } catch (e) {
    fs.unlink(pathname);
    consola.error(e);
    res.status(400).send();
  }
}

exports.getUserImages = async (req, res) => {
  const {username} = req.params;

  try {
    const images = await knex('users_images')
      .select(['image_path', 'id'])
      .where({ username });
    images.forEach(image => {
      image.image_path = constructImageUrl(image.image_path)
    })
    res.json({images});
  } catch (e) {
    consola.error(e);
    res.status(400).send();
  }
}

exports.removeUserImage = async (req, res) => {
  const { username } = req.params;
  const id = Number(req.params.id);

  try {
    const [{avatar_id}] = await knex('users')
      .select('avatar_id')
      .where({ username })

    if (id === avatar_id) {
      throw new Error('Can\'t remove the avatar');
    }

    const [ imagePath ] = await knex('users_images')
      .where({username, id})
      .returning('image_path')
      .del()

    fs.unlink(imagePath);
    res.status(200).send();
  } catch (e) {
    consola.error(e);
    res.status(400).send();
  }
}

exports.changeAvatar = async (req, res) => {
  const { username } = req.params;
  const avatar_id = Number(req.params.id);

  try {
    const avatar = await knex.transaction(async function(trx) {
      const [image] = await trx('users_images')
        .select(['id', 'image_path'])
        .where({username, id: avatar_id})
        .limit(1);

      if (!image) throw new Error('You cannot set an avatar of an image who isn\'t yours');

      await trx('users')
        .where({ username })
        .update({avatar_id});

      return {
        avatar_id,
        avatar_path: constructImageUrl(image.image_path),
      }
    })
    res.json({avatar});
  } catch (e) {
    consola.error(e);
    res.status(400).send();
  }
}
