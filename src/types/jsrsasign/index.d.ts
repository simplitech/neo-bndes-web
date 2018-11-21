declare module 'jsrsasign' {
  interface RSAKey {
    readPrivateKeyFromPEMString(pem: string)
  }
}
