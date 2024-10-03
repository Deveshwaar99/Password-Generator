'use client'

import { Checkbox, type CheckedState } from '@radix-ui/react-checkbox'
import { Label } from '@radix-ui/react-label'
import { Progress } from '@radix-ui/react-progress'
import { Slider } from '@radix-ui/react-slider'
import { Toast } from '@radix-ui/react-toast'
import { useEffect, useState } from 'react'
import { useToast } from '../hooks/use-toast'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Copy, RefreshCw } from 'lucide-react'
import { generatePassword } from '../lib/generate-password'
import { calculateStrength, getStrengthColor, getStrengthLabel } from '../lib/strength-calculator'

export default function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [strength, setStrength] = useState(0)
  const { toast } = useToast()

  function generateNewPassword() {
    const newPassword = generatePassword(
      { includeLowercase, includeUppercase, includeNumbers, includeSymbols },
      length
    )
    setPassword(newPassword)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    toast({
      title: 'Copied!',
      description: 'Password copied to clipboard',
    })
  }

  const handleOnCheckChange = (
    checked: CheckedState,
    type: 'lowercase' | 'uppercase' | 'number' | 'symbol'
  ) => {
    if (typeof checked !== 'boolean') return
    switch (type) {
      case 'lowercase': {
        setIncludeLowercase(checked)
        break
      }
      case 'uppercase': {
        setIncludeUppercase(checked)
        break
      }
      case 'number': {
        setIncludeNumbers(checked)
        break
      }
      case 'symbol': {
        setIncludeSymbols(checked)
        break
      }
      default:
        throw new Error('Checkbox error')
    }
  }

  useEffect(() => {
    setStrength(calculateStrength(password))
  }, [password])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Password Generator</CardTitle>
          <CardDescription className="text-center">
            Create a secure password with custom options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Generated Password</Label>
            <div className="flex space-x-2">
              <Input id="password" value={password} readOnly className="flex-grow font-mono" />
              <Button variant="outline" size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy password</span>
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Password Strength</Label>
              <span className="text-sm font-medium">{getStrengthLabel(strength)}</span>
            </div>
            <Progress value={strength} className={`h-2 ${getStrengthColor(strength)}`} />
          </div>
          <div className="space-y-2">
            <Label>Password Length: {length}</Label>
            <Slider
              value={[length]}
              onValueChange={value => setLength(value[0])}
              min={8}
              max={32}
              step={1}
              className="cursor-pointer"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeLowercase"
                checked={includeLowercase}
                onCheckedChange={checked => handleOnCheckChange(checked, 'lowercase')}
              />
              <Label htmlFor="includeLowercase" className="cursor-pointer">
                Lowercase (a-z)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeUppercase"
                checked={includeUppercase}
                onCheckedChange={checked => handleOnCheckChange(checked, 'uppercase')}
              />
              <Label htmlFor="includeUppercase" className="cursor-pointer">
                Uppercase (A-Z)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeNumbers"
                checked={includeNumbers}
                onCheckedChange={checked => handleOnCheckChange(checked, 'number')}
              />
              <Label htmlFor="includeNumbers" className="cursor-pointer">
                Numbers (0-9)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeSymbols"
                checked={includeSymbols}
                onCheckedChange={checked => handleOnCheckChange(checked, 'symbol')}
              />
              <Label htmlFor="includeSymbols" className="cursor-pointer">
                Symbols (!@#$%^&*)
              </Label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={generateNewPassword} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" /> Generate Password
          </Button>
        </CardFooter>
      </Card>
      <Toast />
    </div>
  )
}
