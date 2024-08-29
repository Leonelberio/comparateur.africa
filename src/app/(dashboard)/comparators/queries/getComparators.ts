import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetComparatorsInput
  extends Pick<
    Prisma.ComparatorFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetComparatorsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: comparators,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.comparator.count({ where }),
      query: (paginateArgs) =>
        db.comparator.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      comparators,
      nextPage,
      hasMore,
      count,
    };
  }
);
