import { QS } from "@toss/utils";

type Params = Record<string, unknown>;

export const request = {
  get: async function <R, P extends Params = Params>(url: string, { params }: { params?: P } = {}) {
    return fetch(`${url}${QS.create(params ?? {})}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((x) => x.json() as R);
  },

  post: async function <R, P extends object = object>(url: string, { json }: { json?: P } = {}) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json ?? {}),
    }).then((x) => x.json() as R);
  },

  put: async function <R, P extends object = object>(url: string, { json }: { json?: P } = {}) {
    return fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json ?? {}),
    }).then((x) => x.json() as R);
  },

  delete: async function <R, P extends object = object>(url: string, { json }: { json?: P } = {}) {
    return fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json ?? {}),
    }).then((x) => x.json() as R);
  },

  patch: async function <R, P extends object = object>(url: string, { json }: { json?: P } = {}) {
    return fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json ?? {}),
    }).then((x) => x.json() as R);
  },
};
