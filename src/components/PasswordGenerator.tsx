import { Copy, RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Slider } from '../components/ui/slider'
import { Switch } from '../components/ui/switch'

import { useToast } from '../hooks/use-toast'
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
      description: ' 🎊 Password copied to clipboard',
      duration: 2000,
    })
  }

  useEffect(() => {
    setStrength(calculateStrength(password))
  }, [password])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    generateNewPassword()
  }, [length, includeLowercase, includeUppercase, includeNumbers, includeSymbols])

  return (
    <>
      <div className=" size-full bg-gradient-to-br from-purple-700 to-indigo-800 flex items-center justify-center p-12">
        <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">
              Password Generator
            </CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              Create a secure password with custom options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Generated Password
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="password"
                  value={password}
                  readOnly
                  className="flex-grow font-mono text-lg bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                />
                <Button variant="outline" onClick={copyToClipboard}>
                  <Copy className=" size-4 text-black" />
                  <span className="sr-only">Copy password</span>
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password Strength
                </Label>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {getStrengthLabel(strength)}
                </span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full  ${getStrengthColor(
                    strength
                  )} transition-all duration-300 ease-in-out`}
                  style={{ width: `${strength}%` }}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password Length
                  </Label>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {length}
                  </span>
                </div>
                <Slider
                  value={[length]}
                  onValueChange={value => setLength(value[0])}
                  min={8}
                  max={32}
                  step={1}
                  className="cursor-pointer "
                />
              </div>
              <div className="space-y-3">
                {[
                  {
                    id: 'includeLowercase',
                    label: 'Lowercase (a-z)',
                    state: includeLowercase,
                    setState: setIncludeLowercase,
                  },
                  {
                    id: 'includeUppercase',
                    label: 'Uppercase (A-Z)',
                    state: includeUppercase,
                    setState: setIncludeUppercase,
                  },
                  {
                    id: 'includeNumbers',
                    label: 'Numbers (0-9)',
                    state: includeNumbers,
                    setState: setIncludeNumbers,
                  },
                  {
                    id: 'includeSymbols',
                    label: 'Symbols (!@#$%^&*)',
                    state: includeSymbols,
                    setState: setIncludeSymbols,
                  },
                ].map(({ id, label, state, setState }) => (
                  <div key={id} className="flex items-center justify-between">
                    <Label
                      htmlFor={id}
                      className="text-sm cursor-pointer text-gray-700 dark:text-gray-300"
                    >
                      {label}
                    </Label>
                    <Switch id={id} checked={state} onCheckedChange={setState} />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={generateNewPassword}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              <RefreshCw className="mr-2 h-4 w-4 text-white" /> Generate New Password
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
