import { IncomingMessage } from "http";

export async function readableStreamToJson<T = { [k: string | number]: any }>(
    stream: ReadableStream
): Promise<T> {
    let reader = stream.getReader();
    let chunks: Uint8Array[] = [];

    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        chunks.push(value);
    }

    const concatenatedChunks = new Uint8Array(
        chunks.reduce((acc, val) => acc.concat(Array.from(val as any)), [])
    );
    const text = new TextDecoder("utf-8").decode(concatenatedChunks);
    return JSON.parse(text) as T;
}

/**
 * username: Levurmion
 * id: 101
 */
export function mockToken() {
    sessionStorage.setItem(
        "access_token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJMZXZ1cm1pb24iLCJpZCI6MTAxLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.J6EhmqDb1oLlLF8x5O3Fx16n7Yjbez3Ix2nqVLNmXUk"
    );
}
