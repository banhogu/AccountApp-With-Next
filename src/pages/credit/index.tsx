import CreditScoreChart from '@/components/shared/CreditScore'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import useUser from '@/hooks/useUser'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import Swal from 'sweetalert2'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

const CreditPage = () => {
  const 신용점수를조회했는가 = true
  const user = useUser()
  const navigate = useRouter()

  const handleCheck = useCallback(() => {
    if (user == null) {
      showModal()

      return
    }

    navigate.push('/credit/check')
  }, [user, navigate])

  const showModal = async () => {
    const result = await Swal.fire({
      title: '로그인이 필요한 기능이에요',
      text: `정확한 신용정보를 확인하기위해 로그인을 먼저 진행해주세요`,
      confirmButtonColor: '#3085d6',
      confirmButtonText: '확인',
    })

    if (result.isConfirmed) {
      navigate.push('/auth/signin')
    }
  }
  return 신용점수를조회했는가 ? (
    <div>
      <Spacing size={40} />
      <Flex align="center" direction="column">
        <Text typography="t4" bold={true} textAlign="center">
          나의 신용점수
        </Text>
        <Spacing size={10} />
        <CreditScoreChart score={100} />
      </Flex>
      <Spacing size={80} />
      <ul>
        <ListRow
          contents={
            <ListRow.Texts
              title="추천카드"
              subTitle="나에게 맞는 카드 찾아보기"
            />
          }
          withArrow={true}
          onClick={() => {
            navigate.push('/card')
          }}
        />
      </ul>
      <FixedBottomButton label="신용점수 올리기" onClick={handleCheck} />
    </div>
  ) : (
    <div>
      <Spacing size={40} />
      <Flex align="center" direction="column">
        <Text typography="t4" bold={true} textAlign="center">
          내 신용점수를
          <br /> 조회하고 관리해보세요
        </Text>
        <Spacing size={10} />
        <CreditScoreChart score={0} />
      </Flex>
      <Spacing size={80} />
      <ul>
        <ListRow
          contents={
            <ListRow.Texts
              title="정확한 신용평점"
              subTitle="대표 신용평가 기관의 데이터로 관리해요"
            />
          }
        />
        <ListRow
          contents={
            <ListRow.Texts
              title="신용점수 무료조회"
              subTitle="신용점수에 영향없이 무료로 조회가 가능해요"
            />
          }
        />
      </ul>
      <FixedBottomButton
        label="30초만에 신용점수 조회하기"
        onClick={handleCheck}
      />
    </div>
  )
}

export default CreditPage
