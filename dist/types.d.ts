export type Tool = {
    name: string;
    description: string;
    schema: {
        type: string;
        properties: Record<string, any>;
        required?: string[];
    };
};
export interface ToolContent {
    type: string;
    text: string;
}
