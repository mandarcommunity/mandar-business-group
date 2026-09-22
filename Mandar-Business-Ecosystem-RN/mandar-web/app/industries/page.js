import Link from 'next/link';
import <span className="text-xl">{getIndustryEmoji(industry)}</span>)()}
                  </div>
                  <span className="font-semibold text-sm leading-tight">{industry}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}