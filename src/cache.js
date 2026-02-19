class LRUCache {
    constructor(maxEntries = 500, ttl = null) {
        this.maxEntries = maxEntries;
        this.ttl = ttl;
        this.cache = new Map();
        this.stats = { hits: 0, misses: 0 };
    }

    set(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size === this.maxEntries) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }
        const entry = { value: value, timestamp: Date.now() };
        this.cache.set(key, entry);
    }

    get(key) {
        if (!this.cache.has(key)) {
            this.stats.misses++;
            return null;
        }
        const entry = this.cache.get(key);
        if (this.ttl && (Date.now() - entry.timestamp > this.ttl)) {
            this.cache.delete(key);
            this.stats.misses++;
            return null;
        }
        this.stats.hits++;
        // Move to the end to mark it as most recently used
        this.cache.delete(key);
        this.cache.set(key, entry);
        return entry.value;
    }

    getStats() {
        return this.stats;
    }
}

// Example Usage:
const cache = new LRUCache(500, 10000); // 500 max entries, 10 seconds TTL
cache.set('a', 'some data');
console.log(cache.get('a')); // returns 'some data'
console.log(cache.get('b')); // returns null, as 'b' is not in cache
setTimeout(() => {
    console.log(cache.get('a')); // returns 'some data' within 10 seconds
}, 5000);
setTimeout(() => {
    console.log(cache.get('a')); // returns null after 10 seconds
}, 12000);
console.log(cache.getStats()); // returns cache statistics
