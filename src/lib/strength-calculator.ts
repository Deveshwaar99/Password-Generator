export const getStrengthLabel = (strength: number) => {
  if (strength <= 25) return 'Weak'
  if (strength <= 50) return 'Fair'
  if (strength <= 75) return 'Good'
  return 'Strong'
}

export const getStrengthColor = (strength: number) => {
  if (strength <= 25) return 'bg-red-500'
  if (strength <= 50) return 'bg-yellow-500'
  if (strength <= 75) return 'bg-blue-500'
  return 'bg-green-500'
}

export const calculateStrength = (pwd: string) => {
  let strength = 0
  if (pwd.length >= 12) strength += 25
  if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) strength += 25
  if (pwd.match(/\d/)) strength += 25
  if (pwd.match(/[^a-zA-Z\d]/)) strength += 25
  return strength
}
