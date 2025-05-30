import { 
  encodeTimeTrialChallenge, 
  decodeTimeTrialChallenge, 
  hasSharedChallenge,
  clearChallengeFromUrl,
  getChallengeDescription
} from '../timeTrialUtils';
import type { TimeTrialShareParams } from '../../types';

// Mock global objects for testing
const mockLocation = {
  search: '',
  pathname: '/Pokemon-Catch/',
  href: 'http://localhost:5173/Pokemon-Catch/',
  origin: 'http://localhost:5173'
};

const mockHistory = {
  replaceState: jest.fn()
};

const mockNavigator = {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined)
  }
};

// Setup mocks
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true
});

Object.defineProperty(window, 'history', {
  value: mockHistory,
  writable: true
});

Object.defineProperty(window, 'navigator', {
  value: mockNavigator,
  writable: true
});

describe('TimeTrialUtils', () => {
  beforeEach(() => {
    // Reset mocks
    mockLocation.search = '';
    mockHistory.replaceState.mockClear();
    mockNavigator.clipboard.writeText.mockClear();
  });  describe('encodeTimeTrialChallenge', () => {
    it('should encode challenge parameters correctly', () => {
      const challengeData: TimeTrialShareParams = {
        generationIndex: 0,
        type: 'Fire',
        letter: 'P',
        difficulty: 'hard',
        pokemonCountCategory: '6-20',
        easyMode: false
      };
      
      const encoded = encodeTimeTrialChallenge(challengeData);
      
      expect(encoded).toContain('c=');
      expect(encoded).toContain('http://localhost:5173/Pokemon-Catch/?');
      
      // Decode to verify content
      const url = new URL(encoded);
      const decoded = decodeTimeTrialChallenge(url.searchParams);
      expect(decoded).toEqual(challengeData);
    });

    it('should handle special characters in type and letter', () => {
      const challengeData: TimeTrialShareParams = {
        generationIndex: 2,
        type: 'Ground',
        letter: 'All',
        difficulty: 'medium',
        pokemonCountCategory: '21-50',
        easyMode: true
      };
      
      const encoded = encodeTimeTrialChallenge(challengeData);
      
      expect(encoded).toContain('c=');
      
      // Decode to verify content
      const url = new URL(encoded);
      const decoded = decodeTimeTrialChallenge(url.searchParams);
      expect(decoded).toEqual(challengeData);
    });
  });

  describe('decodeTimeTrialChallenge', () => {
    it('should decode valid base64 challenge parameters', () => {
      const challengeData = {
        d: 'easy',
        p: '1-5',
        e: true,
        g: 1,
        t: 'Water',
        l: 'S'
      };
      const encodedData = btoa(JSON.stringify(challengeData));
      const params = new URLSearchParams(`c=${encodedData}`);
      
      const decoded = decodeTimeTrialChallenge(params);
      
      expect(decoded).toEqual({
        generationIndex: 1,
        type: 'Water',
        letter: 'S',
        difficulty: 'easy',
        pokemonCountCategory: '1-5',
        easyMode: true
      });
    });

    it('should return null for non-challenge URLs', () => {
      const params = new URLSearchParams('gen=0&type=Fire');
      
      const decoded = decodeTimeTrialChallenge(params);
      
      expect(decoded).toBeNull();
    });

    it('should return null for invalid base64', () => {
      const params = new URLSearchParams('c=invalid-base64');
      
      const decoded = decodeTimeTrialChallenge(params);
      
      expect(decoded).toBeNull();
    });

    it('should return null for invalid JSON', () => {
      const params = new URLSearchParams('c=' + btoa('invalid-json'));
      
      const decoded = decodeTimeTrialChallenge(params);
      
      expect(decoded).toBeNull();
    });

    it('should use default values for missing parameters in decoded JSON', () => {
      const challengeData = { g: 0 }; // Only generation index
      const encodedData = btoa(JSON.stringify(challengeData));
      const params = new URLSearchParams(`c=${encodedData}`);
      
      const decoded = decodeTimeTrialChallenge(params);
      
      expect(decoded).toEqual({
        generationIndex: 0,
        type: 'All Types',
        letter: 'All',
        difficulty: 'medium',
        pokemonCountCategory: '1-5',
        easyMode: false
      });
    });

    it('should return null for invalid generation index', () => {
      const challengeData = { g: -1, d: 'easy', p: '1-5' };
      const encodedData = btoa(JSON.stringify(challengeData));
      const params = new URLSearchParams(`c=${encodedData}`);
      
      const decoded = decodeTimeTrialChallenge(params);
      
      expect(decoded).toBeNull();
    });
  });

  describe('hasSharedChallenge', () => {
    it('should return true when c parameter exists', () => {
      mockLocation.search = '?c=eyJkIjoiZWFzeSIsInAiOiIxLTUifQ=='; // base64 encoded challenge
      
      const result = hasSharedChallenge();
      
      expect(result).toBe(true);
    });

    it('should return false when no c parameter exists', () => {
      mockLocation.search = '?gen=0&type=Fire';
      
      const result = hasSharedChallenge();
      
      expect(result).toBe(false);
    });

    it('should return false when search is empty', () => {
      mockLocation.search = '';
      
      const result = hasSharedChallenge();
      
      expect(result).toBe(false);
    });
  });

  describe('clearChallengeFromUrl', () => {
    it('should clear all URL parameters', () => {
      mockLocation.href = 'http://localhost:5173/Pokemon-Catch/?c=encoded&other=param';
      
      clearChallengeFromUrl();
      
      expect(mockHistory.replaceState).toHaveBeenCalledWith(
        {},
        document.title,
        'http://localhost:5173/Pokemon-Catch/'
      );
    });

    it('should handle URL with no parameters', () => {
      mockLocation.href = 'http://localhost:5173/Pokemon-Catch/';
      
      clearChallengeFromUrl();
      
      expect(mockHistory.replaceState).toHaveBeenCalledWith(
        {},
        document.title,
        'http://localhost:5173/Pokemon-Catch/'
      );
    });
  });

  describe('getChallengeDescription', () => {
    it('should generate correct description for specific filters', () => {
      const challenge: TimeTrialShareParams = {
        generationIndex: 1, // Gen 1 (Kanto)
        type: 'Fire',
        letter: 'P',
        difficulty: 'hard',
        pokemonCountCategory: '6-20',
        easyMode: false
      };

      const description = getChallengeDescription(challenge);

      expect(description).toBe('Catch Gen 1 (Kanto) Fire-type Pokémon starting with "P"!');
    });

    it('should handle "All" filters correctly', () => {
      const challenge: TimeTrialShareParams = {
        generationIndex: 0, // All Generations
        type: 'All Types',
        letter: 'All',
        difficulty: 'easy',
        pokemonCountCategory: '21-50',
        easyMode: true
      };

      const description = getChallengeDescription(challenge);

      expect(description).toBe('Catch All Generations Pokémon!');
    });

    it('should handle All Generations correctly', () => {
      const challenge: TimeTrialShareParams = {
        generationIndex: 9, // Assuming this would be "All Generations" or invalid
        type: 'Electric',
        letter: 'All',
        difficulty: 'medium',
        pokemonCountCategory: '1-5',
        easyMode: false
      };

      const description = getChallengeDescription(challenge);

      expect(description).toContain('Electric-type Pokémon!');
    });
  });

  describe('Integration tests', () => {
    it('should encode and decode the same data correctly', () => {
      const original: TimeTrialShareParams = {
        generationIndex: 2,
        type: 'Psychic',
        letter: 'A',
        difficulty: 'medium',
        pokemonCountCategory: '21-50',
        easyMode: true
      };

      const encoded = encodeTimeTrialChallenge(original);
      const url = new URL(encoded);
      const params = url.searchParams;
      const decoded = decodeTimeTrialChallenge(params);

      expect(decoded).toEqual(original);
    });

    it('should handle edge cases in round-trip encoding', () => {
      const edgeCase: TimeTrialShareParams = {
        generationIndex: 8, // Max generation
        type: 'All',
        letter: 'All',
        difficulty: 'hard',
        pokemonCountCategory: '50+',
        easyMode: false
      };

      const encoded = encodeTimeTrialChallenge(edgeCase);
      const url = new URL(encoded);
      const params = url.searchParams;
      const decoded = decodeTimeTrialChallenge(params);

      expect(decoded).toEqual(edgeCase);
    });
  });
});
