const { env } = process;

module.exports = {
  jwtSecret: env.JWT_SECRET
}
