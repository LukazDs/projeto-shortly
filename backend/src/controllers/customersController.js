import { userRepository } from "../repositories/getCustomer.js";

export async function getUrlsMe(_req, res) {

    try {

        const { userId } = res.locals;

        const { rows: infoUser } = await userRepository.infoCustomer(userId);

        const { rows: infoUrls } = await userRepository.infoCustomerUrls(userId);

        const payload = { ...infoUser[0], shortenedUrls: infoUrls };

        res.status(200).send(payload);

    } catch (error) {

        res.sendStatus(500);

    }
}
