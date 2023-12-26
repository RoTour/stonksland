export interface UseCase<Input, Output> {
	launch: (input: Input) => Promise<Output>;
}

export interface UseCaseSync<Input, Output> {
	launch: (input: Input) => Output;
}