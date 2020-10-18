const { env } = process;

module.exports = {
  jwtSecret: env.JWT_SECRET,
  baseUrl: 'http://localhost:',
  port: 3000,
}
