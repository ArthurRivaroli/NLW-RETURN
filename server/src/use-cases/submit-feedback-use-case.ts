import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/prisma/feeebacks-repository";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}


export class SubmitFeedbackUseCase {

    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ) { }


    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;
        
        if (!type) {
            throw new Error('Type is required.');
        }

        if (!comment) {
            throw new Error('Comment is required.');
        }  

        
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format')
        }
        
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })

        await this.mailAdapter.sendMail({
            subject: 'New Feedback',
            body:
                [
                    `<div style="front-family: sans-serif; front-size:16px; color:#111;">`,
                    `<p> Tipo do Feedback ${type}</p>`,
                    `<p> Comentário do feedback: ${comment}</p>`,
                    screenshot ? `<img src="${screenshot}"` : ``,
                    `</div>`
                ].join('\n')
        })

    }
}