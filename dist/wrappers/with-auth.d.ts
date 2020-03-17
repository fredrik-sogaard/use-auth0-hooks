import React from 'react';
import { AccessTokenRequestOptions } from '../context/auth0-context';
export default function withAuth<TChildProps>(ChildComponent: React.ComponentType<TChildProps>, options?: AccessTokenRequestOptions): React.ComponentType<TChildProps>;
