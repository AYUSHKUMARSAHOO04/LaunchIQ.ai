import {
  useEffect,
  useState,
} from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Button,
} from '@/components/ui/button'

import {
  Input,
} from '@/components/ui/input'

import {
  supabase,
} from '@/lib/supabase'

import {
  useAuth,
} from '@/context/AuthContext'

export function
SettingsPage() {

  const { user } =
    useAuth()

  const [loading,
    setLoading,
  ] =
    useState(false)

  const [profileImage,
    setProfileImage,
  ] =
    useState<string | null>(
      null
    )

  const [fileName,
    setFileName,
  ] =
    useState(
      'No file chosen'
    )

  const [fullName,
    setFullName,
  ] =
    useState('')

  const [email,
    setEmail,
  ] =
    useState('')

  const [organization,
    setOrganization,
  ] =
    useState('')

  const [role,
    setRole,
  ] =
    useState('')

  // -----------------------------
  // LOAD PROFILE
  // -----------------------------
  useEffect(() => {

    if (!user)
      return

    async function
      loadProfile() {

      try {

        const {
          data,
          error,
        } =
          await supabase
            .from(
              'profiles'
            )
            .select('*')
            .eq(
              'user_id',
              user.id
            )
            .single()

        if (
          error &&
          error.code !==
            'PGRST116'
        ) {

          throw error
        }

        if (data) {

          setFullName(
            data.full_name ??
              ''
          )

          setEmail(
            data.email ??
              user.email ??
              ''
          )

          setOrganization(
            data.organization ??
              ''
          )

          setRole(
            data.role ??
              ''
          )

          setProfileImage(
            data.avatar_url ??
              null
          )
        }

        else {

          setEmail(
            user.email ??
              ''
          )
        }
      }

      catch (
        error
      ) {

        console.error(
          'Profile load failed:',
          error
        )
      }
    }

    loadProfile()

  }, [user])

    // -----------------------------
  // UPLOAD IMAGE PREVIEW
  // -----------------------------
  const handleImageUpload =
    (
      event:
      React.ChangeEvent<HTMLInputElement>
    ) => {

      const file =
        event.target
          .files?.[0]

      if (file) {

        setProfileImage(
          URL.createObjectURL(
            file
          )
        )

        setFileName(
          file.name
        )
      }
    }

  // -----------------------------
  // SAVE PROFILE
  // -----------------------------
  async function
    saveProfile() {

    if (!user)
      return

    try {

      setLoading(
        true
      )

      const {
        error,
      } =
        await supabase
          .from(
            'profiles'
          )
          .upsert(

            {
              user_id:
                user.id,

              full_name:
                fullName,

              email:
                user.email,

              organization,

              role,

              avatar_url:
                profileImage,
            },

            {
              onConflict:
                'user_id',
            }
          )

      if (error)
        throw error

      alert(
        'Profile saved successfully!'
      )
    }

    catch (
      error
    ) {

      console.error(
        'Profile save failed:',
        error
      )

      alert(
        'Failed to save profile'
      )
    }

    finally {

      setLoading(
        false
      )
    }
  }

  const avatarLetter =
  fullName
    ?.charAt(0)
    ?.toUpperCase() ||

  email
    ?.charAt(0)
    ?.toUpperCase() ||

  'A'

return (
  <div className="space-y-6">

    {/* Header */}
    <div>

      <h1 className="text-3xl font-bold">
        Settings
      </h1>

      <p className="text-muted-foreground">
        Manage your
        profile,
        preferences,
        and LaunchIQ.ai
        experience.
      </p>

    </div>

    {/* Profile Card */}
    <Card>

      <CardHeader>

        <CardTitle>
          Profile Settings
        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-8">

        {/* Profile Photo */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">

          {/* Avatar */}
          <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-border bg-muted shadow-sm">

            {profileImage ? (

              <img
                src={
                  profileImage
                }
                alt="Profile"
                className="h-full w-full object-cover"
              />

            ) : (

              <div className="flex h-full w-full items-center justify-center text-4xl font-bold">

                {
                  avatarLetter
                }

              </div>

            )}

          </div>

          {/* Upload */}
          <div className="flex-1 space-y-2">

            <label className="text-sm font-medium">

              Upload Profile Photo

            </label>

            <div className="overflow-hidden rounded-xl border border-border bg-background">

              <div className="flex h-12">

                <label
                  htmlFor="photo"
                  className="flex w-1/2 cursor-pointer items-center justify-center border-r border-border bg-muted/50 font-medium transition hover:bg-muted"
                >
                  Choose File
                </label>

                <div className="flex w-1/2 items-center px-4 text-sm text-muted-foreground">

                  {
                    fileName
                  }

                </div>

              </div>

              <input
                id="photo"
                type="file"
                accept="image/*"
                onChange={
                  handleImageUpload
                }
                className="hidden"
              />

            </div>

          </div>

        </div>

        {/* Name + Email */}
        <div className="grid gap-4 md:grid-cols-2">

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Full Name
            </label>

            <Input
              value={
                fullName
              }
              onChange={(e) =>
                setFullName(
                  e.target
                    .value
                )
              }
              placeholder="Enter your full name"
            />

          </div>

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Email Address
            </label>

            <Input
              value={
                email
              }
              disabled
              type="email"
            />

          </div>

        </div>

        {/* Organization + Role */}
        <div className="grid gap-4 md:grid-cols-2">

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Organization
            </label>

            <Input
              value={
                organization
              }
              onChange={(e) =>
                setOrganization(
                  e.target
                    .value
                )
              }
              placeholder="Enter organization"
            />

          </div>

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Role
            </label>

            <Input
              value={
                role
              }
              onChange={(e) =>
                setRole(
                  e.target
                    .value
                )
              }
              placeholder="Founder / Product Manager"
            />

          </div>

        </div>

        {/* Save Button */}
        <Button
          onClick={
            saveProfile
          }
          disabled={
            loading
          }
          className="w-full md:w-auto"
        >

          {loading
            ? 'Saving...'
            : 'Save Profile'}

        </Button>

      </CardContent>

    </Card>

  </div>
)
}
