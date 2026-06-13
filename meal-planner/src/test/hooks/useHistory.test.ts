import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useHistory } from '../../hooks/useHistory';

beforeEach(() => localStorage.clear());

describe('useHistory', () => {
  it('starts with empty history',               () => {
    const { result } = renderHook(() => useHistory());
    expect(result.current.entries).toHaveLength(0);
  });

  it('adds entry via save()',                    () => {
    const { result } = renderHook(() => useHistory());
    act(() => result.current.save({ id: 'x', savedAt: '', preferences: {} as any, plan: {} as any }));
    expect(result.current.entries).toHaveLength(1);
  });

  it('deletes entry via remove()',               () => {
    const { result } = renderHook(() => useHistory());
    act(() => result.current.save({ id: 'y', savedAt: '', preferences: {} as any, plan: {} as any }));
    act(() => result.current.remove('y'));
    expect(result.current.entries).toHaveLength(0);
  });

  it('clears all via clear()',                   () => {
    const { result } = renderHook(() => useHistory());
    act(() => result.current.save({ id: 'a', savedAt: '', preferences: {} as any, plan: {} as any }));
    act(() => result.current.clear());
    expect(result.current.entries).toHaveLength(0);
  });
});
