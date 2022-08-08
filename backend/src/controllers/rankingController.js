import { rankingRepository } from "../repositories/getRanking.js";

export async function getRanking(_req, res) {

    try {

        const { rows: payload } = await rankingRepository.getRanking();

        res.status(200).send(payload);

    } catch (error) {

        res.sendStatus(500);

    }
}
