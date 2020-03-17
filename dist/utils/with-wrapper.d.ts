import { ComponentType, ReactElement } from 'react';
export default function withWrapper<TPropsType extends {}, TChildProps extends {}>(ChildComponent: ComponentType<TChildProps>, name: string, render: (props: TPropsType) => ReactElement<TChildProps> | null): ComponentType<TChildProps & TPropsType>;
