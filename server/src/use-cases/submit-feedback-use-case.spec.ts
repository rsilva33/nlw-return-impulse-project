import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
            { create: createFeedbackSpy },
            { sendMail: sendMailSpy }
        )

describe('Submit feedback', () => {
    it('should be able submit a feedback', async () => {
     await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Example comment',
            screenshot: 'data:image/png;base64,sxuybsuibquabIBIUBibJNJISNKN',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should net be able to submit feedback without type', async () => {
        await expect(submitFeedback.execute({
               type: '',
               comment: 'Example comment',
               screenshot: 'data:image/png;base64,sxuybsuibquabIBIUBibJNJISNKN',
           })).rejects.toThrow();
       });

    it('should net be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,sxuybsuibquabIBIUBibJNJISNKN',
        })).rejects.toThrow();
    });

    it('should net be able to submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Example comment',
            screenshot: 'teste.jpg',
        })).rejects.toThrow();
    });
});

// test('sum 2 + 2', () => {
//     expect(2 + 2).toBe(4)
// });