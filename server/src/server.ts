import { PrismaClient } from "@prisma/client";
import cors from '@fastify/cors'
import fastify from "fastify";

const prisma = new PrismaClient()
const app = fastify()

app.register(cors)

app.get('/', async () => {
    const habits = await prisma.habit.findMany({})

    return habits
})

app.listen({
    port:3000
})