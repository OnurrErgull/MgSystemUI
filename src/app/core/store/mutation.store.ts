import { Injectable, signal } from '@angular/core';

@Injectable()
export class MutationStore<TInput, TOutput> {
  loading = signal(false);
  error = signal<string | null>(null);
  lastResult = signal<TOutput | null>(null);

  async call(
    fn: (input: TInput) => Promise<TOutput>,
    input: TInput,
    opts?: { optimistic?: () => void; rollback?: () => void }
  ) {
    this.loading.set(true);
    this.error.set(null);
    try {
      opts?.optimistic?.();
      const result = await fn(input);
      this.lastResult.set(result);
      return result;
    } catch (e: any) {
      this.error.set(e?.message ?? 'Request failed');
      opts?.rollback?.();
      throw e;
    } finally {
      this.loading.set(false);
    }
  }
}
