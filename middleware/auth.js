import jwt from 'jsonwebtoken';

export async function verifyToken(request, reply) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) return reply.code(401).send({status: false, message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded; 
  } catch (err) {
    return reply.code(401).send({status: false, message: 'Invalid token' });
  }
}