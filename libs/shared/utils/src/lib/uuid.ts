export type Uuid = string;

// NewID generates a random base-58 ID.
export function uuid(): string {
    const LENGTH = 11;
    const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'; // base58
    const randomNumbers = Array.from(crypto.getRandomValues(new Uint8Array(LENGTH)));

    return randomNumbers.reduce((id, n) => id + ALPHABET[n % ALPHABET.length], '');
}
