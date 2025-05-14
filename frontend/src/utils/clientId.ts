export function getOrCreateClientId(): string {
    let clientId = localStorage.getItem("client_id");
    if (!clientId) {
        clientId = crypto.randomUUID(); // Or use uuidv4() from 'uuid'
        localStorage.setItem("client_id", clientId);
    }
    return clientId;
}
