export const useNovelsStore = defineStore('novels', () => {
    const novels = ref([
        {
            id: 1,
            title: 'The Great Gatsby',
            content: 'When Nick returns home after talking to Jordan, Gatsby comes out of the darkness and startles him. Nick thinks that he is very nervous and almost desperate to make him happy. Nick realizes that Gatsby is agitated because he wants to know if he will go along with the plan to invite Daisy to his house. Nick assures him that he is going to help him, and Gatsby becomes overjoyed. He feels he has to repay Nick somehow, so he offers him the opportunity to participate in one of his businesses.',
            characters: [
                {
                    name: 'Nick Carraway',
                    description: 'A young man from Minnesota who has come to New York after graduating from Yale and fighting in World War I. He is the neighbor of Jay Gatsby and the cousin of Daisy Buchanan.',
                    pronouns: 'he/him',
                },
                {
                    name: 'Jay Gatsby',
                    description: 'A fabulously wealthy young man living in a Gothic mansion in West Egg. He is famous for the lavish parties he throws every Saturday night, but no one knows where he comes from, what he does, or how he made his fortune.',
                    pronouns: 'he/him',
                },
            ],
            description: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
            tags: "classic, romance, drama",
        }
    ]);


    const newNovel = () => {
        const maxId = novels.value.reduce((max, novel) => Math.max(max, novel.id), 0);

        const newNovel = {
            id: maxId + 1,
            title: 'New novel',
            content: '',
            characters: [],
            description: '',
            tags: "",
        };


        novels.value.push(newNovel);

        return newNovel;
    };

    const deleteNovel = (id: number) => {
        novels.value = novels.value.filter(novel => novel.id !== id);

        novels.value = novels.value.map((novel, index) => {
            return {
                ...novel,
                id: index + 1,
            };
        });
    };

    const currentModel = ref('NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO');
    const models = ref(["NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO", "mistralai/Mistral-7B-Instruct-v0.2", "openai-community/gpt2", "microsoft/Phi-3-mini-4k-instruct"]);
    const currentPrompt = ref('You are a writer who is writing a novel. Below, you can find all the information about the novel. Continue writing send, I want you to answer with the next part of the novel, and only that.');
    const hfToken = ref('');
    const maxNewTokens = ref(256);

    return {
        novels,
        currentModel,
        models,
        currentPrompt,
        hfToken,
        maxNewTokens,
        newNovel,
        deleteNovel,
    };
}, {
    persist: {
        storage: persistedState.localStorage,
    }
});