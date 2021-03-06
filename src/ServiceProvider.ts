import React from "react";

export class ServiceProvider {
  private services = new Map();

  get<T>(serviceName: string): T {
    if (this.services.has(serviceName)) {
      return this.services.get(serviceName) as T;
    } else throw new Error(`Service '${serviceName} not registered in ServiceProvider`);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  register(serviceName: string, service: object): void {
    this.services.set(serviceName, service);
  }
}

export const ServiceProviderContext = React.createContext<ServiceProvider>(new ServiceProvider());
