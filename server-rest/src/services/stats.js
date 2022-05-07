import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

class StatsService {
    async getTotals() {
        var totalCanvas = await prisma.canvas.count();
        var totalPlays = await prisma.play.count();
        var totalSnaps = await prisma.snapshot.count();
        var totalUniqueClients = (
            await prisma.play.groupBy({
                by: ['clientId'],
            })
        ).length;

        return {
            totalCanvas,
            totalPlays,
            totalSnaps,
            totalUniqueClients,
        };
    }

    async getPlaysPerCanvas() {
        const data = await prisma.play.groupBy({
            by: ['canvasId'],
            _count: {
                id: true,
            },
        });

        return data.map((p) => {
            return {
                total: p._count.id,
                canvasId: p.canvasId,
            };
        });
    }

    async getPlaysPerClient() {
        const data = await prisma.play.groupBy({
            by: ['clientId'],
            _count: {
                id: true,
            },
        });

        return data.map((p) => {
            return {
                total: p._count.id,
                clientId: p.clientId,
            };
        });
    }

    async getPlaysByHour() {
        return await prisma.$queryRaw`select date_trunc('hour', "createdAt") as "timestamp", COUNT(id) as "total" FROM pixelwars."Play" group by "timestamp"`;
    }

    async getSnapshotsByHour() {
        return await prisma.$queryRaw`select date_trunc('hour', "createdAt") as "timestamp", COUNT(id) FROM pixelwars."Snapshot" group by "timestamp";`;
    }
}

export default new StatsService();
