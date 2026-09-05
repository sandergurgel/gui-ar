import { describe, it, expect } from 'vitest';
import {
  isValidTab,
  isValidTrack,
  sanitizeChecklist,
  sanitizeConditions,
  sanitizeLemon,
  sanitizeWeight,
} from '../utils/stateValidation';

describe('stateValidation', () => {
  it('accepts only known tracks', () => {
    expect(isValidTrack('CRASH')).toBe(true);
    expect(isValidTrack('SRI')).toBe(true);
    expect(isValidTrack('DSI')).toBe(true);
    expect(isValidTrack('AWAKE')).toBe(true);
    expect(isValidTrack('INVALID')).toBe(false);
    expect(isValidTrack(null)).toBe(false);
    expect(isValidTrack(undefined)).toBe(false);
    expect(isValidTrack(123)).toBe(false);
  });

  it('accepts only known tabs', () => {
    expect(isValidTab('checklist')).toBe(true);
    expect(isValidTab('pharma')).toBe(true);
    expect(isValidTab('execution')).toBe(true);
    expect(isValidTab('post')).toBe(true);
    expect(isValidTab('other')).toBe(false);
    expect(isValidTab(null)).toBe(false);
    expect(isValidTab(undefined)).toBe(false);
  });

  it('sanitizes weight keeping only finite values within 10-250', () => {
    expect(sanitizeWeight(70)).toBe(70);
    expect(sanitizeWeight(10)).toBe(10);
    expect(sanitizeWeight(250)).toBe(250);
    expect(sanitizeWeight(9.9)).toBe(null);
    expect(sanitizeWeight(251)).toBe(null);
    expect(sanitizeWeight(NaN)).toBe(null);
    expect(sanitizeWeight(Infinity)).toBe(null);
    expect(sanitizeWeight(-Infinity)).toBe(null);
    expect(sanitizeWeight('70')).toBe(null);
    expect(sanitizeWeight(null)).toBe(null);
    expect(sanitizeWeight(undefined)).toBe(null);
  });

  it('sanitizes conditions keeping only boolean keys and coercing others to false', () => {
    expect(
      sanitizeConditions({
        isShock: true,
        isTBI: false,
        isBronchospasm: true,
        isHyperkalemiaRisk: false,
      })
    ).toEqual({
      isShock: true,
      isTBI: false,
      isBronchospasm: true,
      isHyperkalemiaRisk: false,
    });

    expect(
      sanitizeConditions({
        isShock: 'yes',
        isTBI: 1,
        isBronchospasm: null,
        isHyperkalemiaRisk: undefined,
        extra: true,
      })
    ).toEqual({
      isShock: false,
      isTBI: false,
      isBronchospasm: false,
      isHyperkalemiaRisk: false,
    });

    expect(sanitizeConditions(null)).toEqual({
      isShock: false,
      isTBI: false,
      isBronchospasm: false,
      isHyperkalemiaRisk: false,
    });

    expect(sanitizeConditions('shock')).toEqual({
      isShock: false,
      isTBI: false,
      isBronchospasm: false,
      isHyperkalemiaRisk: false,
    });
  });

  it('sanitizes lemon keeping only boolean keys and coercing others to false', () => {
    expect(
      sanitizeLemon({
        lookExternal: true,
        eval332: true,
        mallampati: false,
        obstruction: false,
        neckMobility: true,
      })
    ).toEqual({
      lookExternal: true,
      eval332: true,
      mallampati: false,
      obstruction: false,
      neckMobility: true,
    });

    expect(
      sanitizeLemon({
        lookExternal: 1,
        eval332: 'x',
        mallampati: null,
        obstruction: {},
        neckMobility: true,
        extra: true,
      })
    ).toEqual({
      lookExternal: false,
      eval332: false,
      mallampati: false,
      obstruction: false,
      neckMobility: true,
    });

    expect(sanitizeLemon(null)).toEqual({
      lookExternal: false,
      eval332: false,
      mallampati: false,
      obstruction: false,
      neckMobility: false,
    });
  });

  it('sanitizes checklist keeping only boolean entries', () => {
    expect(sanitizeChecklist({ a: true, b: false })).toEqual({ a: true, b: false });
    expect(sanitizeChecklist({ a: true, b: 'yes', c: 1, d: false })).toEqual({
      a: true,
      d: false,
    });
    expect(sanitizeChecklist(null)).toEqual({});
    expect(sanitizeChecklist([])).toEqual({});
    expect(sanitizeChecklist('check')).toEqual({});
  });
});
