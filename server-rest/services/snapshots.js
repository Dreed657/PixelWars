import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

class SnapshotsService {
    async getAll() {
        return await prisma.snapshot.findMany();
    }

    async getById(id) {
        return await prisma.snapshot.findUnique({
            where: {
                id: Number(id),
            },
        });
    }

    async create(snapshot) {
        var result = await prisma.snapshot.create({
            data: {
                canvasId: snapshot.canvasId,
                state: snapshot.state,
            },
        });

        return result;
    }

    async update(id, data) {
        const snapshot = await prisma.snapshot.findUnique({
            where: {
                id: Number(id),
            },
        });

        try {
            return await prisma.snapshot.update({
                where: { id: Number(id) || undefined },
                data: {
                    canvasId: data.canvasId,
                    state: data.state,
                },
            });
        } catch (e) {
            return null;
        }
    }

    async delete(id) {
        return await prisma.snapshot.delete({
            where: {
                id: Number(id),
            },
        });
    }
}

export default new SnapshotsService();
