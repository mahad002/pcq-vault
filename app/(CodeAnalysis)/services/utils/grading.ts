export interface GradeDict {
  [key: string]: { Variant:any; Mode: string; Type: string; Rounds: any; OutputSize: any; BlockSize: any; PreQSecurity: any; 'PreQ-Score': any; PostQSecurity: any; 'PostQ-Score': any; }[];
}

export const gradedict1:GradeDict =

{
rsa: [
  {
    Variant: '512',
    Mode: '-',
    Type: 'PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 56,
    'PreQ-Score': 50,
    PostQSecurity: 0,
    'PostQ-Score': 0
  },
  {
    Variant: '768',
    Mode: '-',
    Type: 'PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 75,
    'PreQ-Score': 57.43478261,
    PostQSecurity: 0,
    'PostQ-Score': 0
  },
  {
    Variant: '1024',
    Mode: '-',
    Type: 'PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 80,
    'PreQ-Score': 60,
    PostQSecurity: 0,
    'PostQ-Score': 0
  },
  {
    Variant: '2048',
    Mode: '-',
    Type: 'PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 112,
    'PreQ-Score': 70,
    PostQSecurity: 0,
    'PostQ-Score': 0
  },
  {
    Variant: '3072',
    Mode: '-',
    Type: 'PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 0,
    'PostQ-Score': 0
  },
  {
    Variant: '4096',
    Mode: '-',
    Type: 'PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 140,
    'PreQ-Score': 81.71428571,
    PostQSecurity: 0,
    'PostQ-Score': 0
  },
  {
    Variant: '8192',
    Mode: '-',
    Type: 'PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 170,
    'PreQ-Score': 86,
    PostQSecurity: 0,
    'PostQ-Score': 0
  },
  {
    Variant: '15360',
    Mode: '-',
    Type: 'PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 0,
    'PostQ-Score': 0
  }
],
ecdhe: [
  {
    Variant: 'secp112r1',
    Mode: '-',
    Type: 'PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 56,
    'PreQ-Score': 50,
    PostQSecurity: 0,
    'PostQ-Score': 0
  },
  {
    Variant: 'secp128r1',
    Mode: '-',
    Type: 'PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 64,
    'PreQ-Score': 53.13043478,
    PostQSecurity: 0,
    'PostQ-Score': 0
  },
  {
    Variant: 'secp192r1',
    Mode: '-',
    Type: 'PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 80,
    'PreQ-Score': 60,
    PostQSecurity: 0,
    'PostQ-Score': 0
  },
  {
    Variant: 'secp224r1',
    Mode: '-',
    Type: 'PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 112,
    'PreQ-Score': 70,
    PostQSecurity: 0,
    'PostQ-Score': 0
  },
  {
    Variant: 'secp256r1',
    Mode: '-',
    Type: 'PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 0,
    'PostQ-Score': 0
  },
  {
    Variant: 'secp384r1',
    Mode: '-',
    Type: 'PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 192,
    'PreQ-Score': 90,
    PostQSecurity: 0,
    'PostQ-Score': 0
  },
  {
    Variant: 'secp521r1',
    Mode: '-',
    Type: 'PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 0,
    'PostQ-Score': 0
  },
  {
    Variant: 'x25519',
    Mode: '-',
    Type: 'PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 0,
    'PostQ-Score': 0
  }
],
dhe: [
  {
    Variant: 'ffdhe2048',
    Mode: '-',
    Type: 'PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 103,
    'PreQ-Score': 66.67741935,
    PostQSecurity: 0,
    'PostQ-Score': 0
  },
  {
    Variant: 'ffdhe3072',
    Mode: '-',
    Type: 'PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 125,
    'PreQ-Score': 77.8,
    PostQSecurity: 0,
    'PostQ-Score': 0
  },
  {
    Variant: 'ffdhe4096',
    Mode: '-',
    Type: 'PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 150,
    'PreQ-Score': 83.14285714,
    PostQSecurity: 0,
    'PostQ-Score': 0
  },
  {
    Variant: 'ffdhe6144',
    Mode: '-',
    Type: 'PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 175,
    'PreQ-Score': 86.71428571,
    PostQSecurity: 0,
    'PostQ-Score': 0
  },
  {
    Variant: 'ffdhe8192',
    Mode: '-',
    Type: 'PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 192,
    'PreQ-Score': 90,
    PostQSecurity: 0,
    'PostQ-Score': 0
  }
],
aes: [
  {
    Variant: '128',
    Mode: 'ECB',
    Type: 'SKE',
    Rounds: 10,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 64,
    'PostQ-Score': 0
  },
  {
    Variant: '128',
    Mode: 'CBC',
    Type: 'SKE',
    Rounds: 10,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 64,
    'PostQ-Score': 0
  },
  {
    Variant: '128',
    Mode: 'CFB',
    Type: 'SKE',
    Rounds: 10,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 64,
    'PostQ-Score': 0
  },
  {
    Variant: '128',
    Mode: 'OFB',
    Type: 'SKE',
    Rounds: 10,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 64,
    'PostQ-Score': 0
  },
  {
    Variant: '128',
    Mode: 'CTR',
    Type: 'SKE',
    Rounds: 10,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 64,
    'PostQ-Score': 0
  },
  {
    Variant: '128',
    Mode: 'GCM',
    Type: 'SKE',
    Rounds: 10,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 64,
    'PostQ-Score': 0
  },
  {
    Variant: '128',
    Mode: 'CCM',
    Type: 'SKE',
    Rounds: 10,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 64,
    'PostQ-Score': 0
  },
  {
    Variant: '192',
    Mode: 'ECB',
    Type: 'SKE',
    Rounds: 12,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 192,
    'PreQ-Score': 90,
    PostQSecurity: 96,
    'PostQ-Score': 64.64516129
  },
  {
    Variant: '192',
    Mode: 'CBC',
    Type: 'SKE',
    Rounds: 12,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 192,
    'PreQ-Score': 90,
    PostQSecurity: 96,
    'PostQ-Score': 64.64516129
  },
  {
    Variant: '192',
    Mode: 'CFB',
    Type: 'SKE',
    Rounds: 12,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 192,
    'PreQ-Score': 90,
    PostQSecurity: 96,
    'PostQ-Score': 64.64516129
  },
  {
    Variant: '192',
    Mode: 'OFB',
    Type: 'SKE',
    Rounds: 12,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 192,
    'PreQ-Score': 90,
    PostQSecurity: 96,
    'PostQ-Score': 64.64516129
  },
  {
    Variant: '192',
    Mode: 'CTR',
    Type: 'SKE',
    Rounds: 12,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 192,
    'PreQ-Score': 90,
    PostQSecurity: 96,
    'PostQ-Score': 64.64516129
  },
  {
    Variant: '192',
    Mode: 'GCM',
    Type: 'SKE',
    Rounds: 12,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 192,
    'PreQ-Score': 90,
    PostQSecurity: 96,
    'PostQ-Score': 64.64516129
  },
  {
    Variant: '192',
    Mode: 'CCM',
    Type: 'SKE',
    Rounds: 12,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 192,
    'PreQ-Score': 90,
    PostQSecurity: 96,
    'PostQ-Score': 64.64516129
  },
  {
    Variant: '256',
    Mode: 'ECB',
    Type: 'SKE',
    Rounds: 14,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 128,
    'PostQ-Score': 80
  },
  {
    Variant: '256',
    Mode: 'CBC',
    Type: 'SKE',
    Rounds: 14,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 128,
    'PostQ-Score': 80
  },
  {
    Variant: '256',
    Mode: 'CFB',
    Type: 'SKE',
    Rounds: 14,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 128,
    'PostQ-Score': 80
  },
  {
    Variant: '256',
    Mode: 'OFB',
    Type: 'SKE',
    Rounds: 14,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 128,
    'PostQ-Score': 80
  },
  {
    Variant: '256',
    Mode: 'CTR',
    Type: 'SKE',
    Rounds: 14,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 128,
    'PostQ-Score': 80
  },
  {
    Variant: '256',
    Mode: 'GCM',
    Type: 'SKE',
    Rounds: 14,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 128,
    'PostQ-Score': 80
  },
  {
    Variant: '256',
    Mode: 'CCM',
    Type: 'SKE',
    Rounds: 14,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 128,
    'PostQ-Score': 80
  }
],
camellia: [
  {
    Variant: '128',
    Mode: 'ECB',
    Type: 'SKE',
    Rounds: 18,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 64,
    'PostQ-Score': 53.13043478
  },
  {
    Variant: '128',
    Mode: 'CBC',
    Type: 'SKE',
    Rounds: 18,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 64,
    'PostQ-Score': 53.13043478
  },
  {
    Variant: '128',
    Mode: 'CFB',
    Type: 'SKE',
    Rounds: 18,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 64,
    'PostQ-Score': 53.13043478
  },
  {
    Variant: '128',
    Mode: 'OFB',
    Type: 'SKE',
    Rounds: 18,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 64,
    'PostQ-Score': 53.13043478
  },
  {
    Variant: '128',
    Mode: 'CTR',
    Type: 'SKE',
    Rounds: 18,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 64,
    'PostQ-Score': 53.13043478
  },
  {
    Variant: '192',
    Mode: 'ECB',
    Type: 'SKE',
    Rounds: 18,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 192,
    'PreQ-Score': 90,
    PostQSecurity: 96,
    'PostQ-Score': 64.64516129
  },
  {
    Variant: '192',
    Mode: 'CBC',
    Type: 'SKE',
    Rounds: 18,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 192,
    'PreQ-Score': 90,
    PostQSecurity: 96,
    'PostQ-Score': 64.64516129
  },
  {
    Variant: '192',
    Mode: 'CFB',
    Type: 'SKE',
    Rounds: 18,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 192,
    'PreQ-Score': 90,
    PostQSecurity: 96,
    'PostQ-Score': 64.64516129
  },
  {
    Variant: '192',
    Mode: 'OFB',
    Type: 'SKE',
    Rounds: 18,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 192,
    'PreQ-Score': 90,
    PostQSecurity: 96,
    'PostQ-Score': 64.64516129
  },
  {
    Variant: '192',
    Mode: 'CTR',
    Type: 'SKE',
    Rounds: 18,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 192,
    'PreQ-Score': 90,
    PostQSecurity: 96,
    'PostQ-Score': 64.64516129
  },
  {
    Variant: '256',
    Mode: 'ECB',
    Type: 'SKE',
    Rounds: 18,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 128,
    'PostQ-Score': 80
  },
  {
    Variant: '256',
    Mode: 'CBC',
    Type: 'SKE',
    Rounds: 18,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 128,
    'PostQ-Score': 80
  },
  {
    Variant: '256',
    Mode: 'CFB',
    Type: 'SKE',
    Rounds: 18,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 128,
    'PostQ-Score': 80
  },
  {
    Variant: '256',
    Mode: 'OFB',
    Type: 'SKE',
    Rounds: 18,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 128,
    'PostQ-Score': 80
  },
  {
    Variant: '256',
    Mode: 'CTR',
    Type: 'SKE',
    Rounds: 18,
    OutputSize: 128,
    BlockSize: 128,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 128,
    'PostQ-Score': 80
  }
],
'triple des': [
  {
    Variant: 'Triple DES',
    Mode: 'ECB',
    Type: 'SKE',
    Rounds: 48,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 112,
    'PreQ-Score': 70,
    PostQSecurity: 56,
    'PostQ-Score': 50
  },
  {
    Variant: 'Triple DES',
    Mode: 'CBC',
    Type: 'SKE',
    Rounds: 48,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 112,
    'PreQ-Score': 70,
    PostQSecurity: 56,
    'PostQ-Score': 50
  }
],
des: [
  {
    Variant: 'DES',
    Mode: 'ECB',
    Type: 'SKE',
    Rounds: 16,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 56,
    'PreQ-Score': 50,
    PostQSecurity: 28,
    'PostQ-Score': 37.82608696
  },
  {
    Variant: 'DES',
    Mode: 'CBC',
    Type: 'SKE',
    Rounds: 16,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 56,
    'PreQ-Score': 50,
    PostQSecurity: 28,
    'PostQ-Score': 37.82608696
  }
],

cast: [
  {
    Variant: '5',
    Mode: '',
    Type: 'SKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 80,
    'PreQ-Score': 60,
    PostQSecurity: 40,
    'PostQ-Score': 43.13043478
  },
  {
    Variant: '6',
    Mode: '',
    Type: 'SKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 128,
    'PostQ-Score': 80
  }
],
idea: [
  {
    Variant: '128',
    Mode: '',
    Type: 'SKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 64,
    'PostQ-Score': 53.13043478
  }
],
rc2: [
  {
    Variant: 'RC2',
    Mode: '',
    Type: 'SKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 80,
    'PreQ-Score': 60,
    PostQSecurity: 40,
    'PostQ-Score': 43.13043478
  }
],
rc4: [
  {
    Variant: 'RC4',
    Mode: '',
    Type: 'SKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 80,
    'PreQ-Score': 60,
    PostQSecurity: 40,
    'PostQ-Score': 43.13043478
  }
],
rc5: [
  {
    Variant: 'RC5',
    Mode: '',
    Type: 'SKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 80,
    'PreQ-Score': 60,
    PostQSecurity: 40,
    'PostQ-Score': 43.13043478
  }
],
serpent: [
  {
    Variant: 'Serpent',
    Mode: '',
    Type: 'SKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 64,
    'PostQ-Score': 53.13043478
  }
],
safer: [
  {
    Variant: 'K64',
    Mode: '',
    Type: 'SKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 64,
    'PreQ-Score': 53.13043478,
    PostQSecurity: 32,
    'PostQ-Score': 40
  },
  {
    Variant: 'K128',
    Mode: '',
    Type: 'SKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 64,
    'PostQ-Score': 53.13043478
  },
  {
    Variant: 'K256',
    Mode: '',
    Type: 'SKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 128,
    'PostQ-Score': 80
  }
],
chacha20: [
  {
    Variant: 'ChaCha20',
    Mode: '',
    Type: 'SKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 128,
    'PostQ-Score': 80
  }
],
salsa20: [
  {
    Variant: 'Salsa20',
    Mode: '',
    Type: 'SKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 128,
    'PostQ-Score': 80
  }
],
gmac: [
  {
    Variant: '128',
    Mode: '',
    Type: 'MAC',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 64,
    'PostQ-Score': 53.13043478
  }
],
ripemd: [
  {
    Variant: '128',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 64,
    'PreQ-Score': 53.13043478,
    PostQSecurity: 32,
    'PostQ-Score': 40
  },
  {
    Variant: '160',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 80,
    'PreQ-Score': 60,
    PostQSecurity: 40,
    'PostQ-Score': 43.13043478
  }
],
md: [
  {
    Variant: 'MD2',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 56,
    'PreQ-Score': 50,
    PostQSecurity: 28,
    'PostQ-Score': 37.82608696
  },
  {
    Variant: 'MD4',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 64,
    'PreQ-Score': 53.13043478,
    PostQSecurity: 32,
    'PostQ-Score': 40
  },
  {
    Variant: 'MD5',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 64,
    'PreQ-Score': 53.13043478,
    PostQSecurity: 32,
    'PostQ-Score': 40
  }
],
shake: [
  {
    Variant: '128',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 64,
    'PostQ-Score': 53.13043478
  },
  {
    Variant: '256',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 128,
    'PostQ-Score': 80
  }
],
sha3:[
  {
    Variant: '224',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 112,
    'PreQ-Score': 70,
    PostQSecurity: 56,
    'PostQ-Score': 50
  },
  {
    Variant: '256',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 64,
    'PostQ-Score': 53.13043478
  },
  {
    Variant: '384',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 192,
    'PreQ-Score': 90,
    PostQSecurity: 96,
    'PostQ-Score': 64.64516129
  },
  {
    Variant: '512',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 128,
    'PostQ-Score': 80
  }
],
sha: [
  {
    Variant: 'SHA-1',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 80,
    'PreQ-Score': 60,
    PostQSecurity: 40,
    'PostQ-Score': 43.13043478
  },
  {
    Variant: '224',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 112,
    'PreQ-Score': 70,
    PostQSecurity: 56,
    'PostQ-Score': 50
  },
  {
    Variant: '256',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 64,
    'PostQ-Score': 53.13043478
  },
  {
    Variant: '384',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 192,
    'PreQ-Score': 90,
    PostQSecurity: 96,
    'PostQ-Score': 64.64516129
  },
  {
    Variant: '512',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 128,
    'PostQ-Score': 80
}
],
blake2b: [
  {
    Variant: '160',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 80,
    'PreQ-Score': 60,
    PostQSecurity: 40,
    'PostQ-Score': 43.13043478
  },
  {
    Variant: '256',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 64,
    'PostQ-Score': 53.13043478
  },
  {
    Variant: '384',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 192,
    'PreQ-Score': 90,
    PostQSecurity: 96,
    'PostQ-Score': 64.64516129
  },
  {
    Variant: '512',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 256,
    'PreQ-Score': 100,
    PostQSecurity: 128,
    'PostQ-Score': 80
  }
],
blake2s: [
  {
    Variant: '128',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 64,
    'PreQ-Score': 53.13043478,
    PostQSecurity: 32,
    'PostQ-Score': 40
  },
  {
    Variant: '160',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 80,
    'PreQ-Score': 60,
    PostQSecurity: 40,
    'PostQ-Score': 43.13043478
  },
  {
    Variant: '224',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 112,
    'PreQ-Score': 70,
    PostQSecurity: 56,
    'PostQ-Score': 50
  },
  {
    Variant: '256',
    Mode: '',
    Type: 'Hash',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 128,
    'PreQ-Score': 80,
    PostQSecurity: 64,
    'PostQ-Score': 53.13043478
  }
],

kyber: [
  {
    Variant: '512',
    Mode: '',
    Type: 'PQC_PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 128,
    'PreQ-Score': 0,
    PostQSecurity: 128,
    'PostQ-Score': 80
  },
  {
    Variant: '768',
    Mode: '',
    Type: 'PQC_PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 192,
    'PreQ-Score': 0,
    PostQSecurity: 192,
    'PostQ-Score': 90
  },
  {
    Variant: '1024',
    Mode: '',
    Type: 'PQC_PKE',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 256,
    'PreQ-Score': 0,
    PostQSecurity: 256,
    'PostQ-Score': 100
  }
],
dilithium: [
  {
    Variant: 'Dilithium 2',
    Mode: '',
    Type: 'PQC_Sig',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 0,
    'PreQ-Score': 0,
    PostQSecurity: 128,
    'PostQ-Score': 80
  },
  {
    Variant: 'Dilithium 3',
    Mode: '',
    Type: 'PQC_Sig',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 0,
    'PreQ-Score': 0,
    PostQSecurity: 192,
    'PostQ-Score': 90
  },
  {
    Variant: 'Dilithium 5',
    Mode: '',
    Type: 'PQC_Sig',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 0,
    'PreQ-Score': 0,
    PostQSecurity: 256,
    'PostQ-Score': 100
  }
],
falcon: [
  {
    Variant: '512',
    Mode: '',
    Type: 'PQC_Sig',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 128,
    'PreQ-Score': 0,
    PostQSecurity: 128,
    'PostQ-Score': 80
  },
  {
    Variant: '1024',
    Mode: '',
    Type: 'PQC_Sig',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 256,
    'PreQ-Score': 0,
    PostQSecurity: 256,
    'PostQ-Score': 100
  }
],
'sphinics+ sha 256': [
  {
    Variant: 'SHA 128 bit',
    Mode: '',
    Type: 'PQC_Sig',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 0,
    'PreQ-Score': 0,
    PostQSecurity: 128,
    'PostQ-Score': 80
  },
  {
    Variant: 'SHA 192 bit',
    Mode: '',
    Type: 'PQC_Sig',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 0,
    'PreQ-Score': 0,
    PostQSecurity: 192,
    'PostQ-Score': 90
  },
  {
    Variant: 'SHA 256 bit',
    Mode: '',
    Type: 'PQC_Sig',
    Rounds: 0,
    OutputSize: 0,
    BlockSize: 0,
    PreQSecurity: 0,
    'PreQ-Score': 0,
    PostQSecurity: 256,
    'PostQ-Score': 100
  }
]
}