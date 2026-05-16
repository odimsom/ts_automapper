type MappingFn<TSource, TDest> = (source: TSource) => TDest;

class AutoMapper {
  private readonly mappings = new Map<string, MappingFn<unknown, unknown>>();

  private key(from: string, to: string): string {
    return `${from}→${to}`;
  }

  createMap<TSource, TDest>(
    from: string,
    to: string,
    fn: MappingFn<TSource, TDest>
  ): this {
    this.mappings.set(this.key(from, to), fn as MappingFn<unknown, unknown>);
    return this;
  }

  map<TSource, TDest>(from: string, to: string, source: TSource): TDest {
    const fn = this.mappings.get(this.key(from, to));
    if (!fn) throw new Error(`No mapping registered from "${from}" to "${to}"`);
    return fn(source) as TDest;
  }

  mapArray<TSource, TDest>(from: string, to: string, sources: TSource[]): TDest[] {
    return sources.map((s) => this.map<TSource, TDest>(from, to, s));
  }
}

const mapper = new AutoMapper();

export { AutoMapper, mapper };
export default mapper;
