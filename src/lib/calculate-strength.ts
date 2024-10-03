export const calculateStrength = (pwd: string): number => {
  let strength = 0
  if (pwd.length >= 12) strength += 25
  if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) strength += 25
  if (pwd.match(/\d/)) strength += 25
  if (pwd.match(/[^a-zA-Z\d]/)) strength += 25
  return strength
}
