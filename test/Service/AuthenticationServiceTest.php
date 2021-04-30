<?php

/**
 * See LICENSE.md for license details.
 */

declare(strict_types=1);

namespace PostDirekt\Autocomplete\Test\Service;

use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use PostDirekt\Autocomplete\Service\AuthenticationService as AuthService;
use PostDirekt\Autocomplete\Service\ModuleConfig;
use PostDirekt\Sdk\Autocomplete\Authentication\Api\AuthenticationServiceInterface;
use PostDirekt\Sdk\Autocomplete\Authentication\Api\ServiceFactoryInterface;
use PostDirekt\Sdk\Autocomplete\Authentication\Exception\ServiceException;
use PostDirekt\Sdk\Autocomplete\Authentication\Model\Token;
use Psr\Log\Test\TestLogger;
use Shopware\Core\Defaults;
use Shopware\Core\System\SystemConfig\SystemConfigService;

/**
 * @author   Andreas Müller <andreas.mueller@netresearch.de>
 *
 * @see     https://www.netresearch.de/
 */
class AuthenticationServiceTest extends TestCase
{
    /**
     * @var ModuleConfig|MockObject
     */
    private $config;

    /**
     * @var ServiceFactoryInterface|MockObject
     */
    private $service;

    /**
     * @var AuthenticationServiceInterface|MockObject
     */
    private $authenticationService;

    /**
     * @var TestLogger
     */
    private $logger;

    protected function setUp(): void
    {
        $this->logger = new TestLogger();
        $systemConfigMock = $this->getMockBuilder(SystemConfigService::class)
                                 ->disableOriginalConstructor()
                                 ->onlyMethods(['get'])
                                 ->getMock();
        $systemConfigMock->method('get')
                         ->willReturnArgument(0);
        $this->config = $this->getMockBuilder(ModuleConfig::class)
                             ->setConstructorArgs([$systemConfigMock])
                             ->onlyMethods(['getApiUser', 'getApiPassword'])
                             ->getMock();
        $this->config->method('getApiUser')->willReturn('user');
        $this->config->method('getApiPassword')->willReturn('pass');
        $this->service = $this->getMockBuilder(ServiceFactoryInterface::class)
                              ->onlyMethods(['createAuthenticationService'])
                              ->getMock();
        $this->authenticationService = $this->getMockBuilder(AuthenticationServiceInterface::class)
                                             ->onlyMethods(['authenticate'])
                                             ->getMock();
        parent::setUp();
    }

    public function testFetchToken(): void
    {
        $salesChannelId = Defaults::SALES_CHANNEL;
        $expected = new Token(
            'abcdefghijklmnopq',
            123456987987
        );

        $this->authenticationService->expects(static::once())
                                    ->method('authenticate')
                                    ->willReturn($expected);
        $this->service->expects(static::once())
                      ->method('createAuthenticationService')
                      ->willReturn($this->authenticationService);
        $service = new AuthService($this->config, $this->service, $this->logger);

        $token = $service->fetchToken($salesChannelId);
        static::assertEquals($expected->getAccessToken(), $token);
    }

    public function testFetchTokenFail(): void
    {
        $salesChannelId = Defaults::SALES_CHANNEL;
        $exception = new ServiceException('Unable to fetch token');

        $this->authenticationService->expects(static::once())
                                    ->method('authenticate')
                                    ->will(static::throwException($exception));
        $this->service->expects(static::once())
                      ->method('createAuthenticationService')
                      ->willReturn($this->authenticationService);
        $service = new AuthService($this->config, $this->service, $this->logger);
        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('Unable to fetch token');
        $service->fetchToken($salesChannelId);
    }
}
