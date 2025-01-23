import { atom } from "jotai"
import { atomFamily } from "jotai/utils"

export const dialogAtomFamily = atomFamily((key: string) => {
  void key
  return atom(false)
})
