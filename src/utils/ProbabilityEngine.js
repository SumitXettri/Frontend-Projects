// utils/ProbabilityEngine.js

// Helper: Levenshtein distance to measure guess similarity
const levenshteinDistance = (a, b) => {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // deletion
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }
  return matrix[b.length][a.length];
};

export const calculateProbabilities = (guess, secret) => {
  guess = guess.toUpperCase();
  secret = secret.toUpperCase();

  let clues = [];
  const secretLetterCount = {};
  const guessLetterCount = {};

  // Count occurrences of each letter in secret and guess
  for (const ch of secret)
    secretLetterCount[ch] = (secretLetterCount[ch] || 0) + 1;
  for (const ch of guess)
    guessLetterCount[ch] = (guessLetterCount[ch] || 0) + 1;

  // Calculate letter probabilities (consider frequency)
  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i];
    const inWord = secret.includes(letter);

    let baseProb = 0;
    if (inWord) {
      const freqRatio =
        Math.min(guessLetterCount[letter], secretLetterCount[letter]) /
        secretLetterCount[letter];
      baseProb = 50 + freqRatio * 50; // Between 50% and 100%
    } else {
      baseProb = Math.random() * 30; // 0-30% if not in word
    }

    // Add randomness +/- 10%
    let prob = baseProb + (Math.random() * 20 - 10);
    prob = Math.min(100, Math.max(0, prob));

    clues.push({ letter, prob: Math.round(prob) });
  }

  // Position probability: higher if letter matches exactly at that position
  for (let i = 0; i < guess.length; i++) {
    const position = i + 1;
    let baseProb =
      guess[i] === secret[i] ? 70 + Math.random() * 30 : Math.random() * 40;

    // Slightly increase if letter is in secret word but wrong position
    if (guess.includes(secret[i]) && guess[i] !== secret[i]) {
      baseProb += 10;
    }

    baseProb = Math.min(100, baseProb);
    clues.push({ position, prob: Math.round(baseProb) });
  }

  // Calculate similarity with Levenshtein distance
  const dist = levenshteinDistance(guess, secret);
  const maxLen = Math.max(guess.length, secret.length);
  const similarity = Math.round(((maxLen - dist) / maxLen) * 100);

  return { guess, clues, similarity };
};
