'use client'
import type { ChangeEventHandler } from 'react'
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { ThemeEnum } from '@/types'

export function ThemeTrigger() {
  const themeCur = (Cookies.get('next-js-color-scheme') as ThemeEnum) ?? ThemeEnum.light
  const [isLightTheme, setIsLightTheme] = useState<boolean>(themeCur === ThemeEnum.light)

  const handleChangeTheme: ChangeEventHandler<HTMLInputElement> = (event) => {
    const checked = event.target.checked
    const colorTheme = checked ? ThemeEnum.light : ThemeEnum.dark
    Cookies.set('next-js-color-scheme', colorTheme)
    document.documentElement.setAttribute('data-theme', colorTheme)
    setIsLightTheme(checked)
  }

  return (
    <label className="swap swap-rotate">
      <input type="checkbox" checked={isLightTheme} onChange={handleChangeTheme} />
      <span className="swap-on fill-current w-6 h-6 icon-[lucide--sun]" />
      <span className="swap-off fill-current w-6 h-6 icon-[lucide--moon]" />
    </label>
  )
}
