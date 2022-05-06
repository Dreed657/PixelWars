import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

class CanvasService {
    async getAll() {
        return await prisma.canvas.findMany();
    }

    async getById(id) {
        return await prisma.canvas.findUnique({
            where: {
                id: Number(id),
            },
        });
    }

    async create(canvas) {
        var result = await prisma.canvas.create({
            data: {
                size: canvas.size,
            },
        });

        return result;
    }

    async update(id, data) {
        const canvas = await prisma.canvas.findUnique({
            where: {
                id: Number(id),
            },
        });

        try {
            return await prisma.canvas.update({
                where: { id: Number(id) || undefined },
                data: { size: data.size },
            });
        } catch (e) {
            return null;
        }
    }

    async delete(id) {
        return await prisma.canvas.delete({
            where: {
                id: Number(id),
            },
        });
    }
}

export default new CanvasService();
