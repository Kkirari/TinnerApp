export interface Message {
    id?: string
    crated_at?: Date
    read_at?: Date
    sender_delete?: boolean
    recipient_delete?: boolean
    sender?: string;
    recipient?: string;
    content?: string;
}
