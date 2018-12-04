declare module 'jsrsasign' {
  class RSAKey {
    readPrivateKeyFromPEMString: (pem: string | null) => void
    sign: (subject: string, encode: string) => any
  }
}
