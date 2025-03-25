graph TD
    A[Faculty Determine Consultation Hours] --> B{Communicate Hours to Secretary?};
    B -- Yes --> C[Secretary Receives Schedule];
    B -- No --> A;
    C --> D[Secretary Manually Posts Schedule on Bulletin Board];
    D --> E[Students Check Bulletin Board];
    E --> F{Find Desired Schedule?};
    F -- Yes --> G[View Consultation Hours];
    F -- No --> E;
