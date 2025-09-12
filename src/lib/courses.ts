
export type Lesson = {
  id: string;
  name: string;
};

export type Course = {
  id: string;
  name: string;
  description: string;
  image: string;
  lessons: Lesson[];
};

export const LEARNING_MODULES: Course[] = [
    {
    id: 'module-basic',
    name: 'English Basic Course',
    description: 'Kamu baru mulai belajar? Pelajari modul ini dulu yuk!',
    image: '/images/basicc.jpg',
    lessons: [
        { id: 'b1', name: 'Beginner' },
        { id: 'b2', name: 'Intermediate' },
        { id: 'b3', name: 'Advanced' },
    ]
  },
]

export const COURSES: Course[] = [
  {
    id: 'daily-conversation',
    name: 'Daily Conversation',
    description: 'Bingung mau kenalan atau ngobrol dengan orang baru? intip modul ini dulu dong.',
    image: '/images/dailyy.jpg',
    lessons: [
        { id: 'dc1', name: 'Greetings' },
        { id: 'dc2', name: 'Ordering Food' },
        { id: 'dc3', name: 'Asking for Directions' },
        { id: 'dc4', name: 'Shopping' },
    ]
  },
  {
    id: 'grammar',
    name: 'Grammar',
    description: 'Hati-Hati dengan grammar Ayo latih skill grammar kamu!',
    image: '/images/gramm.jpg',
    lessons: [
        { id: 'g1', name: 'Present Tense' },
        { id: 'g2', name: 'Past Tense' },
        { id: 'g3', name: 'Future Tense' },
        { id: 'g4', name: 'Prepositions' },
    ]
  },
  {
    id: 'vocabulary',
    name: 'Vocabulary',
    description: 'Tambahin kosakata bahasa inggris kamu yuk!',
    image: '/images/vocc.jpg',
    lessons: [
        { id: 'v1', name: 'Common Nouns' },
        { id: 'v2', name: 'Action Verbs' },
        { id: 'v3', name: 'Adjectives' },
        { id: 'v4', name: 'Idioms' },
    ]
  },
];
