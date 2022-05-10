const Validator = {
  url(v: string | null): boolean {
    try {
      if (v) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const url = new URL(v);
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  },

  textIdentifier(v: string | null): boolean {
    return !!v && v.length >= 1 && v.length <= 250;
  },

  filename(v: string | null): boolean {
    return !!v && /^[0-9a-z_]*$/.test(v);
  },

  keyboard(v: string | null): boolean {
    return !!v && /^[0-9a-z][0-9a-z_/]*$/.test(v);
  },

  hexNumber4d(v: string | null): boolean {
    return !!v && /^^0x[0-9A-F]{4}$/.test(v);
  },

  bcdVersion(v: string | null): boolean {
    return !!v && /^[0-9]{1,2}\.[0-9]\.[0-9]$/.test(v);
  },
};

export default Validator;
