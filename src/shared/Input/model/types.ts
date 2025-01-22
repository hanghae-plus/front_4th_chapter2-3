export interface InputProps {
    className?: string
    type?: string
    value?: string | number
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void | Promise<void>
    placeholder?: string
}