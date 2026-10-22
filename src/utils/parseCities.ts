export const parseCities = (input: string): string[] => {
    const seen = new Set<string>();
    return input
        .split(',')
        .map((c) => c.trim())
        .filter((c) => {
            const key = c.toLowerCase();
            if (!c || seen.has(key)) return false;
            seen.add(key);
            return true;
        });
};