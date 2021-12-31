export interface ICommandHandler<TCommand, TResponse> {
    handle(command: TCommand): Promise<TResponse>;
}
