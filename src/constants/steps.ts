export const CONFIGURE_ID_KEY = "configurationId";
export type StepType = {
    name: string
    description: string
    url: string
}
export const STEPS: StepType[] = [
    {
        name: "Step 1: Add image",
        description: "Choose an image for your case",
        url: "/upload"
    },
    {
        name: "Step 2: Customise Design",
        description: "Make the case your",
        url: "/design"
    },
    {
        name: "Step 3: Summary",
        description: "Review your final design",
        url: "/preview"
    },
]