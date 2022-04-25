import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

class PlaysService {
    async save(play) {
        return await prisma.play.create({
            data: {
                canvasId: play.canvasId,
                clientId: play.clientId,
                cell: play.cell,
            },
        });
    }

    async getAll() {
        return await prisma.play.findMany();
    }
}

export default new PlaysService();
