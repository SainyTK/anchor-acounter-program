use anchor_lang::prelude::*;

declare_id!("26pLVQG6CJybjhbtFJbmcmAwqUVuFYmSso1yMFGVnW2E");

#[program]
pub mod anchor_number {
    use super::*;

    pub fn init(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.counter_acc.count = 0;
        Ok(())
    }

    pub fn inc(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.counter_acc.count += 1;
        Ok(())
    }

    pub fn dec(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.counter_acc.count -= 1;
        Ok(())
    }

    pub fn set(ctx: Context<Update>, data: u64) -> Result<()> {
        ctx.accounts.counter_acc.count = data;
        Ok(())
    }

    pub fn close(ctx: Context<Close>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = signer, space = 8 + 8)]
    pub counter_acc: Account<'info, Counter>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub counter_acc: Account<'info, Counter>,
    pub signer: Signer<'info>,
}

#[derive(Accounts)]
pub struct Close<'info> {
    #[account(mut, close = signer)]
    pub data_account: Account<'info, Counter>,
    #[account(mut)]
    pub signer: Signer<'info>,
}

#[account]
pub struct Counter {
    count: u64,
}
