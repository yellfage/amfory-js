import type { Access } from './access'

const ACCESS_KEY = 'access'

export class AccessStore {
  public onchange: (access: Access) => void

  public getAccessOrDefault(): Access {
    const access = localStorage.getItem(ACCESS_KEY)

    if (access == null || !access.length) {
      return { token: '', refreshToken: '' }
    }

    return JSON.parse(access) as Access
  }

  public setAccess(access: Access): void {
    localStorage.setItem(ACCESS_KEY, JSON.stringify(access))

    this.onchange(access)
  }
}
