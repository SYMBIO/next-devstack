import * as React from 'react';
import { ConsumerProps, Context, ProviderProps, Consumer as ConsumerI, Provider as ProviderI } from 'react';

function onlyChild(children: any): any {
    return Array.isArray(children) ? children[0] : children;
}

export function combineContext<In extends { [key: string]: any }>(
    contexts: { [K in keyof In]: Context<In[K]> },
): Context<{ [K in keyof In]: In[K] }> {
    class Provider extends React.Component<ProviderProps<{ [K in keyof In]: In[K] }>> {
        render() {
            const init = this.props.children;
            return Object.keys(contexts).reduce((acc, contextName) => {
                const TheContext = contexts[contextName];
                return <TheContext.Provider value={this.props.value[contextName]}>{acc}</TheContext.Provider>;
            }, init);
        }
    }

    class Consumer extends React.Component<ConsumerProps<{ [K in keyof In]: In[K] }>> {
        render() {
            const init = (value: { [K in keyof In]: In[K] }) => onlyChild(this.props.children)(value);
            const renderer = Object.keys(contexts).reduce<(value: { [K in keyof In]: In[K] }) => any>(
                (acc, contextName) => {
                    const TheContext = contexts[contextName];
                    return (value: { [K in keyof In]: In[K] }) => (
                        <TheContext.Consumer>
                            {(contextValue) => {
                                return acc({
                                    ...(value as any),
                                    [contextName]: contextValue,
                                });
                            }}
                        </TheContext.Consumer>
                    );
                },
                init,
            );
            return renderer({} as any);
        }
    }

    return {
        Consumer: (Consumer as unknown) as ConsumerI<{ [K in keyof In]: In[K] }>,
        Provider: (Provider as unknown) as ProviderI<{ [K in keyof In]: In[K] }>,
    };
}
